package spring.monster.todowebminiproject002.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.util.StringUtils;
import spring.monster.todowebminiproject002.enumeration.Tag;
import spring.monster.todowebminiproject002.exception.InvalidEnumTypeException;
import spring.monster.todowebminiproject002.exception.ValidationException;

import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

public class TagDeserialize extends JsonDeserializer<Tag> {

    @Override
    public Tag deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String value = jsonParser.getText().trim();

        // Handle empty or invalid values
        if (!StringUtils.hasText(value)) {
            throw new ValidationException("Task tag cannot be empty.");
        }

        try {
            // Attempt to map the value to an enum
            return Tag.valueOf(value.toUpperCase()); // Case insensitive
        } catch (IllegalArgumentException e) {
            // Handle invalid enum value and provide a list of valid values
            String allowedTags = Arrays.stream(Tag.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            throw new InvalidEnumTypeException("Invalid tag: " + value + ". Allowed values: " + allowedTags);
        }
    }

}
