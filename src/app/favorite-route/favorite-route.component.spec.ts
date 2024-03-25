import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRouteComponent } from './favorite-route.component';

describe('FavoriteRouteComponent', () => {
  let component: FavoriteRouteComponent;
  let fixture: ComponentFixture<FavoriteRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
