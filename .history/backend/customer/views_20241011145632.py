from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import logout
from .models import Favorite
from .serializers import FavoriteSerializer
from restaurant.models import Restaurant, Dish
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken




@api_view(['POST'])
def customer_signup(request):
    data = request.data
    print("Received data:", data)  # Print received data for debugging
    # print(f"Request Data: {data}")
    # Check if the necessary fields are in the request data
    if not all(key in data for key in ('email', 'first_name', 'last_name', 'password')):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    # Hash the password and assign it to the 'password_hash' field in the data dictionary
    hashed_password = make_password(data['password'])
    print("Hashed password during signup:", hashed_password)
    data['password_hash'] = hashed_password  # Store hashed password in 'password_hash'
    serializer = CustomerSerializer(data=request.data) #hamsa added: request.
    
    if serializer.is_valid():
        customer = serializer.save()
        # print(f"Serializer Data: {serializer.data}")  
        # print(f"Hashed Password: {customer.password_hash}")  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print("Serializer errors:", serializer.errors)  # Print validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 2. Customer Login (Password Check)
@api_view(['POST'])
def customer_login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    try:
        # Fetch user by email
        user = User.objects.get(email=email)
        print("User found:", user.email)  # Debug log
        print("Stored password hash:", user.password)  # Print stored hash
        print("Entered password:", password)
    except User.DoesNotExist:
        print("User with email not found:", email)
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    # Verify the password
    is_password_correct = check_password(password, user.password)
    print("Password verification result:", is_password_correct)  # Debug password check

    if is_password_correct
    if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful',
                'token': str(refresh.access_token),  # Access token
                'refresh': str(refresh)  # Refresh token
            }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


# 3. Create a Customer Profile
@api_view(['POST'])
def create_customer(request):
    data = request.data
    data['password'] = make_password(data['password'])  # Hash the password
    serializer = CustomerSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 4. Get a specific Customer Profile
@api_view(['GET'])
def get_customer(request, pk):
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CustomerSerializer(customer)
    return Response(serializer.data)

# 5. Update a Customer Profile (Update Password with Hashing)
@api_view(['PUT'])
def update_customer(request, pk):
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data
    if 'password' in data:  # If the password is being updated, hash it
        data['password'] = make_password(data['password'])
    
    serializer = CustomerSerializer(customer, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors) 
        print(f"Request Data: {request.data}")
        print(f"Validated Data: {serializer.validated_data}")  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 6. Delete a Customer Profile
@api_view(['DELETE'])
def delete_customer(request, pk):
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
    
    customer.delete()
    return Response({'message': 'Customer deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Customer Logout
@api_view(['POST'])
def customer_logout(request):
    logout(request)  # Django built-in function for logging out
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)



@api_view(['POST'])
def add_favorite(request):
    customer = request.user
    restaurant_id = request.data.get('restaurant_id')
    dish_id = request.data.get('dish_id')

    if not restaurant_id and not dish_id:
        return Response({'error': 'No restaurant or dish selected'}, status=status.HTTP_400_BAD_REQUEST)

    if restaurant_id:
        restaurant = Restaurant.objects.get(id=restaurant_id)
        favorite, created = Favorite.objects.get_or_create(customer=customer, restaurant=restaurant)
    elif dish_id:
        dish = Dish.objects.get(id=dish_id)
        favorite, created = Favorite.objects.get_or_create(customer=customer, dish=dish)

    if created:
        return Response({'success': 'Favorite added'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'info': 'Already in favorites'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def remove_favorite(request):
    customer = request.user
    restaurant_id = request.data.get('restaurant_id')
    dish_id = request.data.get('dish_id')

    if restaurant_id:
        Favorite.objects.filter(customer=customer, restaurant_id=restaurant_id).delete()
    elif dish_id:
        Favorite.objects.filter(customer=customer, dish_id=dish_id).delete()

    return Response({'success': 'Favorite removed'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_favorites(request):
    customer = request.user
    favorites = Favorite.objects.filter(customer=customer)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
