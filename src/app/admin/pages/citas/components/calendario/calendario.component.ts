import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/alert.service';
import { CitaServicioService } from '../../services/cita-servicio.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  citas: Cita[] = [];

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  actions: CalendarEventAction[] = [
    {
      label: '<i title="Editar" class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i title="Eliminar" class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(
    private citasService: CitasService,
    private router: Router,
    private alertService: AlertService,
    private citasServiciosService: CitaServicioService
  ) {}

  ngOnInit(): void {
    this.citasService.getAll().subscribe((res) => {
      const { ok, items } = res;
      if (ok) {
        this.citas = items;
        this.citas.map((cita) => {
          let calendarEvent: CalendarEvent = {
            id: cita.id,
            title: `${cita.nombreCompleto}`,
            start: addHours(startOfDay(new Date(cita.fecha!)), 2),
            end: addHours(new Date(cita.fecha!), 2),
            actions: this.actions,
          };

          this.events.push(calendarEvent);
        });
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);

    if (action == 'Edited') {
      this.router.navigateByUrl(`/admin/citas/guardar-cita/${event.id}/save`);
    } else if (action == 'Deleted') {
      this.delete(event.id);
    } else {
      this.router.navigateByUrl(`/admin/citas/guardar-cita/${event.id}/view`);
    }

    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  delete(id: any) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'El registro no podrá recuperarse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.alertService.loader();

        this.citasServiciosService.deleteByCitaId(id).subscribe((res) => {
          if (res.ok) {
            this.citasService.delete(id).subscribe((res) => {
              if (res.ok) {
                this.citas = this.citas.filter((c) => c.id !== id);
                // this.dataSource.data = this.citas;
                this.alertService.successOrError(
                  'Registro eliminado!',
                  '',
                  'success'
                );
              }
            });
          }
        });
      }
    });
  }
}
