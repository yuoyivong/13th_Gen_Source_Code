"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { uploadFileAction } from "@/actions/fileAction";
import { createNewBookAction, updateBookAction } from "@/actions/bookAction";
import { useRouter } from "next/navigation";

export default function AddEditBookComponent({
  genresList,
  book,
  edit,
  bookId,
}) {
  console.log("Book : ", book);

  const fileInputRef = useRef(null);
  const { back } = useRouter();

  // state to store selected file
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputFile, setInputFile] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);

  // function for handling upload file image
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setInputFile(event.target.files[0]);
  };

  // send request to upload file to api first
  const handleFileUpload = async () => {
    if (inputFile) {
      const formData = new FormData();
      formData.append("file", inputFile);

      const uploadedFile = await uploadFileAction(formData);
      return uploadedFile?.payload;
    }
  };

  // get all selected genres
  const handleSelectGenres = (selected) => {
    setSelectedGenre(Array.from(selected));
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const cover = await handleFileUpload();

    const bookObj = {
      ...data,
      bookCover: cover || "",
      bookGenres: selectedGenre,
    };

    if (edit && bookId) {
      const updatedBook = await updateBookAction(bookId, bookObj);

      if (updatedBook?.statusCode === "OK") {
        back();
      }
    } else {
      // send data to action
      const response = await createNewBookAction(bookObj);

      if (response?.statusCode === "CREATED") {
        back();
      }
    }
  };

  return (
    <Form validationBehavior="native" onSubmit={handleSubmit}>
      {/* upload book cover, book title, author, and category */}
      <div className="grid grid-cols-3 gap-20 self-center">
        <div className="cursor-pointer bg-white h-[248px] w-[220px] rounded-xl drop-shadow-lg flex items-center justify-center overflow-hidden">
          {/* upload image */}
          <Input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          {selectedFile ? (
            <Image
              src={selectedFile}
              width={220}
              height={248}
              alt="selected file image"
              onClick={() => fileInputRef.current.click()}
            />
          ) : (
            <div
              className="flex flex-col items-center"
              onClick={() => fileInputRef.current.click()}
            >
              <ImagePlus size={36} color="#9CA3AF" />
              <p className="text-secondary">Upload a File</p>
            </div>
          )}
        </div>

        <div className="w-full col-span-2 space-y-10">
          {/* book title */}
          <Input
            isRequired
            errorMessage="This title cannot be empty."
            label="Title"
            labelPlacement="outside"
            name="title"
            placeholder="Enter title"
            type="text"
            defaultValue={book?.payload?.title || ""}
          />

          {/* book edition */}
          <Input
            label="Edition"
            labelPlacement="outside"
            name="edition"
            placeholder="Enter Book Edition"
            type="number"
            defaultValue={book?.payload?.edition || ""}
          />

          {/* book category */}
          <Select
            isRequired
            label="Genre"
            placeholder="Select any book genre"
            selectionMode="multiple"
            labelPlacement="outside"
            name="genresList"
            defaultSelectedKeys={book?.payload?.bookGenreList?.map(
              (g) => g?.genreId
            )}
            onSelectionChange={handleSelectGenres}
          >
            {genresList?.payload?.map((genre) => (
              <SelectItem key={genre?.genreId}>{genre?.genreName}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="w-full px-32 pt-12 space-y-8">
        {/* description */}
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          defaultValue={book?.payload?.description || ""}
        />
        <Button
          type="submit"
          className={`${
            edit ? "bg-primary text-white" : "bg-secondary"
          } font-medium px-6`}
        >
          {edit ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
}
