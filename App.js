const calculateLoanAmount = e => {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = (parseFloat(interest.value) / (100 * 12));
    const calculatedPayment = parseFloat(years.value) * 12;

    //calculate monethly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
        document.querySelector('#results').style.display = 'block';

        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

    
}

//show error
const showError = error => {
    document.querySelector('#loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    //clear error
    setTimeout(clearError, 2000);
}

//clear error
const clearError = () => {
    document.querySelector('.alert').remove();
}


document.getElementById('loan-form').addEventListener('submit', e => {
    
    document.querySelector('#results').style.display = 'none';

    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateLoanAmount, 500);
    
    e.preventDefault();
});

