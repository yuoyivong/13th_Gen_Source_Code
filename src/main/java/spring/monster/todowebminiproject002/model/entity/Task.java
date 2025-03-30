package spring.monster.todowebminiproject002.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.enumeration.Tag;

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

    @Column(length = 60)
    private Tag tag;

    @Column(length = 30, nullable = false)
    private Status status;

    @Column(name = "is_favorite", nullable = false)
    private boolean isFavorite;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;


}
