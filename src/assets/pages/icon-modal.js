  'use strict';
  $(document).ready(function() {
      $('.outer-ellipsis').on('click', function() {
          var font_class = ($(this).children().attr('class'));
          $('.modal-icon').modal('show');
          $('#icon').removeClass();
          $('#icon').addClass(font_class);
          $('#name').val(font_class);
          $('#code').val('<i class="' + font_class + '"></i>');
      });
  });
