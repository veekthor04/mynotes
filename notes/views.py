from django.shortcuts import render, get_object_or_404
from .models import Note

# Create your views here.
def note_list(request):
    if request.method == 'POST':
        Note.objects.all().delete()
        count = request.POST['count']
        for i in range(int(count)):
            Note.objects.create(title = str(i + 1), body= request.POST[str(i + 1)] )
    notes = Note.objects.all()
    count = str(notes.count())
    print(count)
    return render(request, 'notes/list.html', {'notes': notes, 'count': count})
