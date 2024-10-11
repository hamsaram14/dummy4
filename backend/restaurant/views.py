from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant, Dish
from .serializers import RestaurantSerializer, DishSerializer

@api_view(['POST'])
def restaurant_signup(request):
    serializer = RestaurantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def restaurant_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        restaurant = Restaurant.objects.get(email=email, password=password)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Restaurant.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_dish(request):
    restaurant_id = request.data.get('restaurant_id')
    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)  # Ensure this restaurant exists
    except Restaurant.DoesNotExist:
        return Response({'error': 'Invalid restaurant ID'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create a new dish and assign the restaurant
    serializer = DishSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(restaurant=restaurant)  # Save the dish with the restaurant
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_dishes(request, restaurant_id):
    dishes = Dish.objects.filter(restaurant_id=restaurant_id)
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
