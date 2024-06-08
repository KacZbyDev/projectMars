from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse
from .forms import *
from .models import Resident, Research,Resource,Level,ResidentAudit, Object, WorkerGroup, WorkDay
from .notHttpFunction import getPercentege
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResearchSerializer, ResourceSerializer, ResidentAuditSerializer, ObjectSerializer, WorkerGroupSerializer
import datetime

# Create your views here.
def renderStartPage(request) -> HttpResponse:
    return render(request,'strona_glowna.html')
def renderMainPage(request) -> HttpResponse:
    return render(request, 'panel.html')

def renderReasourcePage(request) -> HttpResponse:
    context = {
        'resources': Resource.objects.only('name','quantity')
    }
    
    return render(request,'panel_zasobow.html',context)
def renderReasearchPage(request)-> HttpResponse:
    context = {
        'research': Research.objects.all()
    }
    return render(request,'panel_technologii.html',context)
def renderResidentPage(request) -> HttpResponse:
    if request.method == 'POST':
        form = SearchResident(request.POST)

        if form.is_valid():
            formList = form.cleaned_data.get('search', '').split(' ')
            paramList = ['%', '%']  

            for i in range(len(formList)):
                if i == len(paramList):
                    break
                paramList[i] = f'%{formList[i]}%'  

            residents = Resident.objects.raw(
                "SELECT * FROM main_resident WHERE name LIKE %s OR surname like %s",
                [paramList[0], paramList[1]]
            )
        else:
            residents = Resident.objects.all() 
    else:
        form = SearchResident()
        residents = Resident.objects.all()  

    context = {
        'residents': residents,
        'searchBar': form
    }

    return render(request, 'panel_mieszkancow.html', context)


def addResident(request) ->HttpResponse:
    form = AddResident()
    if request.method == 'POST':
        form = AddResident(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')  # Redirect to a success page or another view
    return render(request, 'add_resident.html', {'form': form,'update':False})
def updateResident(request,pk) ->HttpResponse:
    resident = Resident.objects.get(id=pk)
    form = AddResident(instance=resident)
    if request.method == 'POST':

        form = AddResident(request.POST, instance=resident)
        if 'update' in request.POST:

            if form.is_valid():
                form.save()
                return redirect('/main')  # Redirect to a success page or another view
        else:
            resident.delete()
            return redirect('/main')

    return render(request, 'add_resident.html', {'form': form, 'update':True})

def renderResearchPage(request, pk) ->HttpResponse:
    research = get_object_or_404(Research, id=pk)
    technology = get_object_or_404(Resource, name="Technologia")
    form = AddResearch()
    add_amount = 0
    if request.method == 'POST':
        form = AddResearch(request.POST)
        if form.is_valid():
            add_amount = int(form.data['add'])

            with transaction.atomic():
                
                if technology.quantity >= add_amount:
                    research.progress_points += add_amount
                    research.save()
                    technology.quantity -= add_amount
                    technology.save()
                else:
                    form.add_error(None, "za malo punktow technologii")
                if research.progress_points >= research.level.next_level_cost:
                    next_level_name = research.level.name + 1
                    level = Level.objects.get(name=next_level_name)

                    research.level = level
                    research.save()




    percentege =  getPercentege(research.progress_points,research.level.next_level_cost)

    context = {
        'research': research,
        'technology': technology,
        'form': form,
        'add': add_amount,
        'percentege': percentege
    }

    return render(request, 'research.html', context)
            #
            # technology.quantity.update(quantity=F('quantity')-add_amount)
            # technology.save()
@api_view(['GET','POST'])
def getRoutes(request) ->Response:
    routes = [
        {'GET':'/api/getResearches'},
        {'GET':'/api/getResources'},
        {'GET':'/api/getMapData'},
        {'POST':'/api/users/token'},
        {'POST':'/api/users/token/refresh'},
        {'POST':'/api/insert'}
    ]
    return Response(routes)
@api_view(['GET'])
def getResearchAudit(request) ->Response:
    research = Research.objects.all()
    serializer = ResearchSerializer(research, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getResourceAudit(request) ->Response:
    resource = Resource.objects.all()
    serializer =  ResourceSerializer(resource, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getResidentAudit(request) ->Response:
    residentAudit = ResidentAudit.objects.all()
    serializer = ResidentAuditSerializer(residentAudit,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getMapData(request) ->Response:
    object = Object.objects.all()
    serializer = ObjectSerializer(object,many=True)

    return Response(serializer.data)
@api_view(['POST'])
def createObject(request) -> Response:

    if request.method == 'POST':
        print(request.POST.keys())
        form = AddObject(request.POST)
        if form.is_valid():
            form.save()
    return Response(status = status.HTTP_204_NO_CONTENT)
@api_view(['GET'])
def createTable(request) -> Response:
    workerGroup = WorkerGroup.objects.all()
    serializer = WorkerGroupSerializer(
        workerGroup,
        many=True,
        context={'work_end':request.GET.get('work_end'), 'work_start': request.GET.get('work_start')}
    )
    return Response(serializer.data)
@api_view(['POST'])
def insertTable(request)-> Response:
    for key in request.POST:

        if key != 'csrfmiddlewaretoken':

            work_hours = request.POST[key].split('-')
            if request.POST[key] != '' and request.POST[key]:

                worker_group_id = key.split('---')[0]

                date = datetime.datetime.strptime(key.split('---')[1], '%d.%m.%Y')
                obj, created = WorkDay.objects.update_or_create(id=key,defaults={
                    'work_group_id': WorkerGroup.objects.get(id=worker_group_id),
                    'work_start': work_hours[0],
                    'work_end': work_hours[1],
                    'date':date
                })
    return Response(status=status.HTTP_204_NO_CONTENT)

