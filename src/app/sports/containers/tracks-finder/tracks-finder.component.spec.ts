import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracksFinderComponent } from './tracks-finder.component';

describe('TracksFinderComponent', () => {
  let component: TracksFinderComponent;
  let fixture: ComponentFixture<TracksFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksFinderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracksFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
