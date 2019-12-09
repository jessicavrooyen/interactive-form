// global variables
const $otherJobRoleTitle = $('#other-title');
const $jobRoleTitle = $('#title');

const $selectTheme = $('#select-theme');
const $color = $('#color');
const $colorOption = $('#color option');
const $design = $('#design');

const $cornflowerblue = $('#color option[value="cornflowerblue"]');
const $darkslategrey = $('#color option[value="darkslategrey"]');
const $gold = $('#color option[value="gold"]');
const $tomato = $('#color option[value="tomato"]');
const $steelblue = $('#color option[value="steelblue"]');
const $dimgrey = $('#color option[value="dimgrey"]');

$('#name').focus(); // focus on 'name' input element

/*  Job Role Section  */
$otherJobRoleTitle.hide();

// When "Other" is selected, reveal a text input field
$($jobRoleTitle).change(function() {
  if ($jobRoleTitle.val() === 'other') {
    $otherJobRoleTitle.show();
  } else {
    $otherJobRoleTitle.hide();
  }
});

/*  T-Shirt Section  */
$selectTheme.attr('disabled', true); // hide 'select theme' 

// hides 'Design' element's first property
$design.on('change', function() {
  $('#design :first').prop('hidden', true); 
});

const $colorValue = $('<option>Please select a T-shirt theme</option>'); // updates 'Color' field input text
$colorValue.attr('value', 'colorValue'); 
$color.prepend($colorValue);
$colorValue.attr('selected', true); // 'Color' option value is selected
$colorValue.prop('hidden', true); // hides the above set 'Color' option value text

$color.attr('disabled', true); // 'Color' drop down menu is disabled

$design.on('change', function() {
  // if 'js puns' is selected, hide 'heart js' options
  if ($(this).val() === 'js puns') {
    $color.attr('disabled', false);
    $cornflowerblue.prop('selected', true); // if js puns is selected, select first element in design drop down
    $cornflowerblue.show();
    $darkslategrey.show();
    $gold.show();
    $tomato.hide();
    $steelblue.hide();
    $dimgrey.hide();
  // if 'heart js' is selected, hide 'js puns' options
  } else if ($(this).val() === 'heart js') {
    $color.attr('disabled', false);
    $tomato.prop('selected', true); // if 'heart js' is selected, select first element in design drop down
    $tomato.show();
    $steelblue.show();
    $dimgrey.show();
    $cornflowerblue.hide();
    $darkslategrey.hide();
    $gold.hide();
  } else { 
    // if none are selected, disable the drop down menu
    $color.attr('disabled', true); 
  }
});

/*  Activity Section  */
//Create a new element and append to 'activities'
let totalCost = 0;
let $totalCostDiv = $('<div></div>').text('Total Cost: $' + totalCost);
$('.activities').append($totalCostDiv); 

$('.activities').on('change', function (event) {
  const $checkbox = $('.activities input'); // reference input element
  const $target = $(event.target);
  const $date = $target.attr('data-day-and-time');
  const $cost = parseInt($target.attr('data-cost').slice(-3));
  const $name = $target.attr('name');
  
  // if checked/unchecked – add/subtract cost – then display updated cost
  if ($target.is(':checked')) {
    totalCost += $cost;
  } else {
    totalCost -= $cost;
  }
  $totalCostDiv.text('Total Cost: $' + totalCost);

  //loop over each activity – when activity is checked/unchecked – enable/disable activity that occurs at same day and time
  $checkbox.each(function() {
    const $clicked = $(this);
    if (($date === $clicked.attr('data-day-and-time')) && ($name) !== $clicked.attr('name')) {
      if ($target.is(':checked')) {
        $clicked.attr('disabled', true);
      } else {
        $clicked.attr('disabled', false);
      }
    }
  });
  console.log($cost);
});