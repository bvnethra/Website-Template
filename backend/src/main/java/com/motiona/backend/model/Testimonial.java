package com.motiona.backend.model;

public class Testimonial {
    private int id;
    private String name;
    private String role;
    private int rating;
    private String feedback;
    private String avatarUrl;

    public Testimonial() {}

    public Testimonial(int id, String name, String role, int rating, String feedback, String avatarUrl) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.rating = rating;
        this.feedback = feedback;
        this.avatarUrl = avatarUrl;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
