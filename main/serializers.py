from rest_framework import serializers
from .models import ResearchAudit,Research, Resource, ResourceAudit,ResidentAudit, ObjectResource,Object, WorkDay, WorkerGroup
from django.db.models import Q
import datetime
class ResearchAuditSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResearchAudit
        fields = '__all__'


class ResearchSerializer(serializers.ModelSerializer):
    projectAudit = serializers.SerializerMethodField()
    class Meta:
        model = Research
        fields = '__all__'

    def get_projectAudit(self, obj):
        researchAudit = obj.research_audits.all()

        return ResearchAuditSerializer(researchAudit,many=True).data
class ResourceAuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceAudit
        fields = "__all__"
class ResourceSerializer(serializers.ModelSerializer):
    resourceAudit = serializers.SerializerMethodField()
    class Meta:
        model = Resource
        fields="__all__"
    def get_resourceAudit(self,obj):
        resourceAudit = obj.resource_audit.all()

        return ResourceAuditSerializer(resourceAudit,many=True).data
class ResidentAuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResidentAudit
        fields = '__all__'
#Pisze ten komentarz zebym wiedzial gdzie znajduje sie poczatek serializerow mapy, bo bedzie z tym pieprzenie

class objectResourceSerializer(serializers.ModelSerializer):
    resource = ResourceSerializer()
    class Meta:
        model = ObjectResource
        fields="__all__"
class ObjectSerializer(serializers.ModelSerializer):

    objectResource = serializers.SerializerMethodField()
    class Meta:
        model = Object
        fields="__all__"
    def get_objectResource(self,obj):
        objectResource = obj.object.all()
        return objectResourceSerializer(objectResource,many=True).data
class WorkDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkDay
        fields = '__all__'
class WorkerGroupSerializer(serializers.ModelSerializer):
    workDay = serializers.SerializerMethodField()
    class Meta:
        model = WorkerGroup
        fields = '__all__'
    def get_workDay(self,obj):
        workDay = obj.work_day.filter(
            Q(date__gte=datetime.datetime.strptime(self.context.get('work_start'), '%d.%m.%Y').date() ) &
            Q(date__lte=datetime.datetime.strptime(self.context.get('work_end'), '%d.%m.%Y').date())
                ).order_by('date')

        return WorkDaySerializer(workDay, many=True).data