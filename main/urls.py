from django.urls import path
from . import views
urlpatterns = [
    path('', views.renderStartPage),
    path('main/', views.renderMainPage),
    path('reasource/',views.renderReasourcePage),
    path('reasearches/', views.renderReasearchPage),
    path('residents/',views.renderResidentPage),
    path('create-resident/', views.addResident),
    path('update-resident/<uuid:pk>/',views.updateResident),
    path('research/<uuid:pk>/',views.renderResearchPage),
    path('',views.getRoutes),
    path('api/getResearches',views.getResearchAudit),
    path('api/getResources',views.getResourceAudit),
    path('api/getResidentAudit',views.getResidentAudit),
    path('api/getMapData',views.getMapData),
    path('api/createObject', views.createObject),
    path('api/createTable', views.createTable),
    path('api/insert', views.insertTable)


]