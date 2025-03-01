"""
URL configuration for finance_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from .views import (
    IncomeListView, IncomeCreateView, IncomeUpdateView, IncomeDeleteView,
    ExpenditureListView, ExpenditureCreateView, ExpenditureUpdateView, ExpenditureDeleteView
)

urlpatterns = [
    path('income/', IncomeListView.as_view(), name='income_list'),
    path('income/add/', IncomeCreateView.as_view(), name='add_income'),
    path('income/edit/<int:pk>/', IncomeUpdateView.as_view(), name='edit_income'),
    path('income/delete/<int:pk>/', IncomeDeleteView.as_view(), name='delete_income'),
    path('expenditure/', ExpenditureListView.as_view(), name='expenditure_list'),
    path('expenditure/add/', ExpenditureCreateView.as_view(), name='add_expenditure'),
    path('expenditure/edit/<int:pk>/', ExpenditureUpdateView.as_view(), name='edit_expenditure'),
    path('expenditure/delete/<int:pk>/', ExpenditureDeleteView.as_view(), name='delete_expenditure'),
]
