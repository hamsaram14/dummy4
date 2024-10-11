from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.restaurant_signup),
    path('login/', views.restaurant_login),
    path('add_dish/', views.add_dish),
    path('get_dishes/<int:restaurant_id>/', views.get_dishes),
]