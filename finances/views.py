from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Income, Expenditure
from .forms import IncomeForm, ExpenditureForm

class IncomeListView(ListView):
    model = Income
    template_name = 'finances/income_list.html'
    context_object_name = 'incomes'

class ExpenditureListView(ListView):
    model = Expenditure
    template_name = 'finances/expenditure_list.html'
    context_object_name = 'expenditures'

class IncomeCreateView(CreateView):
    model = Income
    form_class = IncomeForm
    template_name = 'finances/add_income.html'

class ExpenditureCreateView(CreateView):
    model = Expenditure
    form_class = ExpenditureForm
    template_name = 'finances/add_expenditure.html'

class IncomeUpdateView(UpdateView):
    model = Income
    form_class = IncomeForm
    template_name = 'finances/add_income.html'

class ExpenditureUpdateView(UpdateView):
    model = Expenditure
    form_class = ExpenditureForm
    template_name = 'finances/add_expenditure.html'

class IncomeDeleteView(DeleteView):
    model = Income
    template_name = 'finances/income_confirm_delete.html'
    success_url = '/'

class ExpenditureDeleteView(DeleteView):
    model = Expenditure
    template_name = 'finances/expenditure_confirm_delete.html'
    success_url = '/'
