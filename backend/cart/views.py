from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from restaurant.models import Dish  


@api_view(['POST'])
def add_to_cart(request):
    customer_id = request.data.get('customer_id')
    dish_id = request.data.get('dish_id')
    quantity = request.data.get('quantity', 1) 

    if quantity is None:
        return JsonResponse({"error": "Quantity is required"}, status=400)

    try:
        cart, created = Cart.objects.get_or_create(customer_id=customer_id)
        dish = Dish.objects.get(id=dish_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, dish=dish)
        
        cart_item.quantity = quantity 
        cart_item.save()

        return Response({'success': 'Item added to cart'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_cart_items(request, customer_id):
    cart = Cart.objects.get(customer_id=customer_id)
    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)