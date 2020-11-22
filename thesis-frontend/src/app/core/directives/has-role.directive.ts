import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {CleanUpHelper} from '../utils';
import {RoleService} from '../services';
import {RolesEnum} from '../enums';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective extends CleanUpHelper implements OnInit {

  #_role: RolesEnum | string;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private roleService: RoleService) {
    super();
  }

  ngOnInit(): void {
    this.roleService.rolesChanged$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this._toggleVisibility();
    });
  }

  @Input()
  set role(value: RolesEnum | string) {
    this.#_role = value;
    this._toggleVisibility();
  }

  private _toggleVisibility(): void {
    if (this.roleService.hasRole(this.#_role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
