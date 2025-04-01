package spring.monster.todowebminiproject002.configuration;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.boot.jackson.JsonComponent;
import spring.monster.todowebminiproject002.enumeration.Tag;
import spring.monster.todowebminiproject002.utils.TagDeserialize;

@JsonComponent
public class TagDeserializeModule extends SimpleModule {

    public TagDeserializeModule() {
        // Register the custom deserializer
        addDeserializer(Tag.class, new TagDeserialize());
    }

}
