from django.contrib import admin
from django.urls import path
from finances import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),  
    path('signup/', views.signup, name='signup'),  
    path('login/', views.login_view, name='login'),  
    path('logout/', views.logout_view, name='logout'),  
    path('daily/', views.daily, name='daily'),  
    path('monthly/', views.monthly, name='monthly'),  
    path('yearly/', views.yearly, name='yearly'),  
]
