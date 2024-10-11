from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    location = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='restaurant_pictures/', null=True, blank=True)
    contact_info = models.CharField(max_length=50)
    timings = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Dish(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=50, choices=[('Appetizer', 'Appetizer'), ('Main Course', 'Main Course'), ('Dessert', 'Dessert')])
    image = models.ImageField(upload_to='dish_images/', null=True, blank=True)

    def __str__(self):
        return self.name
