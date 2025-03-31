package spring.monster.todowebminiproject002.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.enumeration.Tag;
import spring.monster.todowebminiproject002.model.dto.response.TaskResponse;

import java.util.Date;
import java.util.UUID;

@Entity(name = "task")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "task_id", nullable = false)
    private UUID taskId;

    @Column(name = "task_title", length = 100, nullable = false)
    private String taskTitle;

    private String details;

    @Column(length = 60, nullable = false)
    private Tag tag;

    @Column(length = 30, nullable = false)
    private Status status;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

//    map task to dto
    public TaskResponse toResponseDTO() {
        TaskResponse task = new TaskResponse();
        task.setTaskId(this.taskId);
        task.setTaskTitle(this.taskTitle);
        task.setTaskDetails(this.details);
        task.setTag(this.tag);
        task.setStatus(this.status);
        task.setStartDate(this.startDate);
        task.setEndDate(this.endDate);

        return task;
    }

}
