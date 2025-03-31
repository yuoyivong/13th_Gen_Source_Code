package spring.monster.todowebminiproject002.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.enumeration.Tag;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskResponse {

    private UUID taskId;
    private String taskTitle;
    private String taskDetails;
    private Tag tag;
    private Status status;
    private Date startDate;
    private Date endDate;

}
