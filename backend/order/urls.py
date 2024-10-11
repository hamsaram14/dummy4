from django.urls import path
from . import views

urlpatterns = [
    path('create_order/', views.create_order),
    path('view_order/<int:order_id>/', views.view_order, name='view_order'),
]