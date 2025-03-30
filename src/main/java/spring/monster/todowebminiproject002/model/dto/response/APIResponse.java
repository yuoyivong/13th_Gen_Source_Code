package spring.monster.todowebminiproject002.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class APIResponse<T> {
    private String message;
    private HttpStatusCode status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T payload;
}
