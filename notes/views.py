from django.shortcuts import render, get_object_or_404
from .models import Note
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def note_list(request):
    user = request.user
    if request.method == 'POST':
        # Note.objects.all().delete()
        Note.objects.filter(owner=user).delete()
        count = request.POST['count']
        for i in range(int(count)):
            Note.objects.create(title = str(i + 1), owner=user, body= request.POST[str(i + 1)] )
    user_notes = Note.objects.filter(owner=user)
    # notes = Note.objects.all()
    count = str(user_notes.count())
    print(count)
    return render(request, 'notes/list.html', {'notes': user_notes, 'count': count})
