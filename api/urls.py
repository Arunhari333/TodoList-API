from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.api_base, name='api-base'),
    path('todo-list/', views.todo_list, name='todo-list'),
    path('todo-detail/<str:pk>/', views.todo_detail, name='todo-detail'),
    path('todo-create/', views.todo_create, name='todo-create'),
    path('todo-update/<str:pk>/', views.todo_update, name='todo-update'),
    path('todo-delete/<str:pk>/', views.todo_delete, name='todo-delete'),
]
