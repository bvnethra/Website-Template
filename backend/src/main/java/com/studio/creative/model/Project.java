package com.studio.creative.model;

public class Project {
    private String id;
    private String title;
    private String category;
    private String description;
    private int year;
    private String client;
    private String imageUrl;
    private String color;

    public Project() {}

    public Project(String id, String title, String category, String description, int year, String client, String imageUrl, String color) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.year = year;
        this.client = client;
        this.imageUrl = imageUrl;
        this.color = color;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getClient() { return client; }
    public void setClient(String client) { this.client = client; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
