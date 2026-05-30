from django.contrib import admin

from .models import (
    Blog,
    ChildProfile,
    VaccineRecord,
    Drive,
    Booking
)


admin.site.register(Blog)

admin.site.register(ChildProfile)

admin.site.register(VaccineRecord)

admin.site.register(Drive)

admin.site.register(Booking)