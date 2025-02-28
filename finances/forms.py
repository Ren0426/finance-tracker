from django import forms
from .models import Income, Expenditure

class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ['description', 'amount', 'date']

class ExpenditureForm(forms.ModelForm):
    class Meta:
        model = Expenditure
        fields = ['description', 'amount', 'date']