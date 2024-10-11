from django.urls import path
from . import views

urlpatterns = [
    path('add_to_cart/', views.add_to_cart),
    path('get_cart_items/<int:customer_id>/', views.get_cart_items),
]