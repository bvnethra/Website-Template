package com.motiona.backend.model;

import java.util.List;

public class Project {
    private int id;
    private String title;
    private String category;
    private String description;
    private List<String> techStack;
    private String imagePath;

    public Project() {}

    public Project(int id, String title, String category, String description, List<String> techStack, String imagePath) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.techStack = techStack;
        this.imagePath = imagePath;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}
