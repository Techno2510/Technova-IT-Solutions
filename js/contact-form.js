/* Static-host contact form: send the visitor's enquiry to WhatsApp. */
(function () {
  'use strict';
  var form = document.getElementById('contactLeadForm');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var lines = [
      'Hello Technova IT Solutions, I would like to enquire about your services.',
      '',
      'Name: ' + (data.get('name') || ''),
      'Company: ' + (data.get('company') || 'Not provided'),
      'Phone: ' + (data.get('phone') || ''),
      'Email: ' + (data.get('email') || ''),
      'Service: ' + (data.get('service') || ''),
      'Requirement: ' + (data.get('message') || '')
    ];
    var url = 'https://wa.me/918210379826?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}());
