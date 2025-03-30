package spring.monster.todowebminiproject002.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.enumeration.Tag;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskRequest {

    private String taskTitle;
    private String taskDetails;
    private Tag tag;

}
