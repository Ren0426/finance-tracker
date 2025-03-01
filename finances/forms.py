from django import forms
from .models import Income, Expenditure

class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ['source', 'amount', 'date']

class ExpenditureForm(forms.ModelForm):
    class Meta:
        model = Expenditure
        fields = ['category', 'amount', 'date']
        
