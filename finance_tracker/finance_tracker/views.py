from django.shortcuts import render, redirect
from .forms import IncomeForm, ExpenditureForm

def add_income(request):
    if request.method == 'POST':
        form = IncomeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('income_list')
    else:
        form = IncomeForm()
    return render(request, 'add_income.html', {'form': form})

def add_expenditure(request):
    if request.method == 'POST':
        form = ExpenditureForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('expenditure_list')
    else:
        form = ExpenditureForm()
    return render(request, 'add_expenditure.html', {'form': form})
