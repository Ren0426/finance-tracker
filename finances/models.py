from django.db import models
from django.urls import reverse

class Income(models.Model):
    source = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.source}: ${self.amount}"

    def get_absolute_url(self):
        return reverse('income_list')

class Expenditure(models.Model):
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.category}: ${self.amount}"

    def get_absolute_url(self):
        return reverse('expenditure_list')
