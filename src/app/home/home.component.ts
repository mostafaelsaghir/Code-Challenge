import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("editor") editor: JsonEditorComponent;
  public demoForm: FormGroup;
  public arrayItems = [];
  public editorOptions: JsonEditorOptions;
  constructor(private _formBuilder: FormBuilder) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code','view'];
    this.editorOptions.mode = 'code';
    this.demoForm = this._formBuilder.group({
      demoArray: this._formBuilder.array([

      ])
    });
  }

  validJson:boolean = true;
  initValue;

  resetTags() {
    const arr = this.demoForm.get("demoArray") as FormArray;
    while (0 !== arr.length ) {
      arr.removeAt(0);
    }
  }
  ngOnInit(): void {
    this.initValue =[
      {
        "label": "Name",
        "type": "Textbox"
      },
      {
        "label": "Dropdown",
        "type": "Dropdown",
        "options": [
          "option 1 ",
          "option 2"
        ]
      },
      {
        "label": "Name",
        "type": "RadioButton"
      },
      {
        "label": "Checkbox",
        "type": "Checkbox"
      },
      {
        "label": "Submit",
        "type": "Submit"
      },
      {
        "label": "Cancel",
        "type": "Cancel"
      }
    ];
    this.initForm(this.initValue)
  }


  get demoArray() {
    return this.demoForm.get("demoArray") as FormArray;
  }


  formChange(value){
 
    let jsonValue = this.editor.get() ;
    let arr = Object.keys(jsonValue).map((k) => jsonValue[k]);       
    this.validJson = true

    this.demoForm = this._formBuilder.group({
      demoArray: this._formBuilder.array([])
    });
    this.arrayItems = [];
    arr.map(field => {
      this.arrayItems.push({ title: field.label,type: field.type ,options: field.options });
      this.demoArray.push(this._formBuilder.control(''));
    });

  }


  initForm(value){
    let jsonValue = value ;    
    this.validJson = true
    this.demoForm = this._formBuilder.group({
      demoArray: this._formBuilder.array([])
    });
    this.arrayItems = [];
    jsonValue.map(field => {
      this.arrayItems.push({ title: field.label,type: field.type ,options: field.options });
      this.demoArray.push(this._formBuilder.control(''));
    });
  }
}
