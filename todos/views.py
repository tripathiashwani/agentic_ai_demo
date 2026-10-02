from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows todos to be viewed, created, edited, or deleted.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        completed = self.request.query_params.get('completed')
        search = self.request.query_params.get('search')

        if completed is not None:
            if completed.lower() in ['true', '1']:
                queryset = queryset.filter(completed=True)
            elif completed.lower() in ['false', '0']:
                queryset = queryset.filter(completed=False)

        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

    @action(detail=True, methods=['patch'], url_path='toggle')
    def toggle_completed(self, request, pk=None):
        todo = self.get_object()
        todo.completed = not todo.completed
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)
