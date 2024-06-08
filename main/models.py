from django.db import models

import uuid

class Job(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False, unique=True)
    name = models.CharField(null=False,max_length=100)
    paycheck = models.DecimalField(null=False,decimal_places=2,max_digits=6)

    def __str__(self):
        return self.name

class Object(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False , unique=True)
    name = models.CharField(max_length=255, null=False)
    xCoordinate = models.DecimalField(max_digits=30,decimal_places=4, null=True)
    yCoordinate = models.DecimalField(max_digits=30,decimal_places=4, null=True)
    emergency_index = models.SmallIntegerField(null=False,default=0)
    security_index = models.SmallIntegerField(null=False)
    description = models.TextField(null = True)
    objects = models.Manager()

    def __str__(self):
        return self.name
class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False , unique = True)
    name = models.CharField(max_length=255, null=False)
    type = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=255, null=False)
    object_id = models.ForeignKey(Object, on_delete=models.CASCADE, null=False)
    capacity = models.IntegerField(null=False)

    def __str__(self):
        return self.name

class WorkerGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique= True)
    name = models.CharField(max_length=255, null=False)
    object_id = models.ForeignKey(Object, on_delete=models.CASCADE, null=False)
    work_start = models.CharField(max_length=255, null=False)
    work_end = models.CharField(max_length=255, null=False)
    objects = models.Manager()

    def __str__(self):
        return self.name
class Resident(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False, unique= True)
    name = models.CharField(max_length=255, null=False)
    surname = models.CharField(max_length=255, null=False)
    birth_date = models.DateTimeField(null=False,auto_now_add=True)
    arrival_date = models.DateTimeField(null=False,auto_now_add=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True)
    live_place = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)
    work_group = models.ForeignKey(WorkerGroup, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True)
    objects = models.Manager()
class Level(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)

    name = models.IntegerField()
    cost = models.IntegerField()
    next_level_cost = models.BigIntegerField()
    objects = models.Manager()
    def __str__(self):
        return str(self.name)
class Research(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(null=False, max_length=300)
    img_path = models.CharField(null=True, max_length=500)
    description = models.TextField()

    status = models.CharField(max_length=255)
    worker_group = models.ForeignKey(WorkerGroup, on_delete=models.CASCADE, null = True, blank=True)
    progress_points = models.IntegerField()
    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    objects = models.Manager()
    def __str__(self):
        return self.name
class Resource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    unit = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    quantity = models.BigIntegerField()
    cost_per_unit = models.DecimalField(max_digits=8, decimal_places=2)
    icon = models.CharField(max_length=255, null=True, blank=True)
    objects = models.Manager()
    def __str__(self):
        return self.name
class ResourceAudit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quantity = models.IntegerField()
    cost_per_unit = models.DecimalField(max_digits=8, decimal_places=2)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="resource_audit")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Audit for {self.resource.name}"
class ResidentAudit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    count = models.BigIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()

class ResearchAudit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    level_name = models.IntegerField(null=False)
    progress_points = models.BigIntegerField()
    research = models.ForeignKey(Research,related_name='research_audits' ,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True )
    objects = models.Manager()

    def __str__(self):
        return f"Audit for {self.research.name}"
class ObjectResource(models.Model):
    object = models.ForeignKey(Object, on_delete=models.CASCADE, related_name='object')
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    daily_allocation = models.DecimalField(max_digits=10, decimal_places=2, db_default=0)
    daily_production = models.BigIntegerField(db_default=0)



    def __str__(self):
        return f"ObjectResource(object={self.object}, resource={self.resource})"
class WorkDay(models.Model):
    id = models.CharField(primary_key=True,editable=False)
    work_group_id = models.ForeignKey(WorkerGroup, on_delete=models.CASCADE, related_name='work_day')
    date = models.DateField(auto_now_add=True)
    work_start = models.CharField(max_length=5)
    work_end = models.CharField(max_length=5)
    objects = models.Manager()
    def __str__(self):
        return f'{self.work_group_id} {self.date}'