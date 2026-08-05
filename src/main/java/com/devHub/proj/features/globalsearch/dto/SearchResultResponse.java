package com.devHub.proj.features.globalsearch.dto;

import com.devHub.proj.features.globalsearch.utils.SearchType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,       // Identifica pelo nome do tipo
    include = JsonTypeInfo.As.PROPERTY, // Insere o identificador como uma propriedade JSON
    property = "type"                 // O nome do campo no JSON será "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = ProjectSearchItemDTO.class, name = "PROJECT"),
    @JsonSubTypes.Type(value = SearchResultResponse.class, name = "USER")
})
public abstract class SearchResultResponse {
    private SearchType type;
    private Long id;
    private String name;
    public SearchResultResponse(SearchType type, Long id, String name) {
        this.type = type;
        this.id = id;
        this.name = name;
    }
    public SearchResultResponse() {
    }
    public SearchType getType() {
        return type;
    }
    public void setType(SearchType type) {
        this.type = type;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
