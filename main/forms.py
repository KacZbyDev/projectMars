from django import forms
from .models import Resident, Object
class AddResident(forms.ModelForm):
    class Meta:
        model = Resident
        exclude = ('id','arrival_date')
class SearchResident(forms.Form):
    search = forms.CharField(max_length=200)

class AddResearch(forms.Form):
    add = forms.IntegerField(
        widget=forms.NumberInput(attrs={
            'id': 'add-input',
            'data-input-counter': '',
            'data-input-counter-min': '1',
            'data-input-counter-max': '100',
            'aria-describedby': 'helper-text-explanation',
            'class': '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',

            'required': 'required',
            'inputmode' : "numeric"
        }))
class AddObject(forms.ModelForm):
    class Meta:
        model = Object
        fields = ['name', 'xCoordinate', 'yCoordinate', 'security_index',
                  'description']

