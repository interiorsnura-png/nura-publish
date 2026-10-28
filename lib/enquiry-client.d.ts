export {};
declare global {
 interface Window {
  nuraEnquiry: {
   prepare(form:HTMLFormElement,fields:Record<string,FormDataEntryValue>):Record<string,FormDataEntryValue>;
   complete(form:HTMLFormElement,result:{lead_id?:string},detail:{form_location:string;enquiry_type:string}):void;
  };
 }
}
