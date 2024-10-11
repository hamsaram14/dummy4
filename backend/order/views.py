from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from cart.models import Cart
from .serializers import OrderSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from cart.models import Cart

@api_view(['POST'])
def create_order(request):
    try:
        # Validate the presence of customer_id
        customer_id = request.data.get('customer_id')
        if not customer_id:
            return Response({'error': 'Invalid or missing customer_id'}, status=status.HTTP_400_BAD_REQUEST)

        # Try to fetch the cart for the customer
        cart = Cart.objects.get(customer_id=customer_id)  # Ensure the cart exists for the customer

        # Ensure the cart is not empty
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the order
        order = Order.objects.create(customer_id=customer_id, restaurant=cart.items.first().dish.restaurant)
        
        # Add items from the cart to the order
        for item in cart.items.all():
            OrderItem.objects.create(order=order, dish=item.dish, quantity=item.quantity)
        
        # Clear the cart after placing the order
        cart.items.all().delete()
        return Response({'success': 'Order placed successfully'}, status=status.HTTP_201_CREATED)
    
    except Cart.DoesNotExist:
        # Handle case where the cart does not exist for the customer
        return Response({'error': 'Cart not found for this customer'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Catch any unexpected errors and return a 500 response
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


import traceback
@api_view(['GET'])
def view_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        traceback.print_exc()  # Print full error traceback
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



