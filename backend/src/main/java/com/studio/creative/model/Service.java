package com.studio.creative.model;

import java.util.List;

public class Service {
    private String id;
    private String title;
    private String description;
    private List<String> details;
    private String accentColor;

    public Service() {}

    public Service(String id, String title, String description, List<String> details, String accentColor) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.details = details;
        this.accentColor = accentColor;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getDetails() { return details; }
    public void setDetails(List<String> details) { this.details = details; }

    public String getAccentColor() { return accentColor; }
    public void setAccentColor(String accentColor) { this.accentColor = accentColor; }
}
