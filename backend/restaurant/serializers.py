from rest_framework import serializers
from .models import Restaurant, Dish

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id','restaurant_id', 'name', 'description', 'price', 'category']

    def create(self, validated_data):
        return Dish.objects.create(**validated_data)
