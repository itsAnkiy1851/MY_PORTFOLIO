document.addEventListener('DOMContentLoaded', function() {
    // Registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Generate Underwriter ID
        const underwriterIdField = document.getElementById('underwriterId');
        const existingUnderwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
        underwriterIdField.value = existingUnderwriters.length + 1; // Auto-incrementing ID

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = underwriterIdField.value;
            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const joiningDate = document.getElementById('joiningDate').value;
            const password = document.getElementById('password').value;

            // Save to local storage
            existingUnderwriters.push({ id, name, dob, joiningDate, password });
            localStorage.setItem('underwriters', JSON.stringify(existingUnderwriters));

            alert(`Underwriter Registered: ${name}`);
            registerForm.reset();
        });
    }

    // Search Underwriter
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const underwriterId = document.getElementById('underwriterId').value;

            // Fetch underwriters from local storage
            const underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
            const user = underwriters.find(uw => uw.id === underwriterId);

            const detailsDiv = document.getElementById('underwriterDetails');
            if (user) {
                detailsDiv.innerHTML = `<p>ID: ${user.id}</p>
                                        <p>Name: ${user.name}</p>
                                        <p>DOB: ${user.dob}</p>
                                        <p>Joining Date: ${user.joiningDate}</p>`;
            } else {
                detailsDiv.innerHTML = `<p>No underwriter found with ID: ${underwriterId}</p>`;
            }
        });
    }

    // Update Password
    const updatePasswordForm = document.getElementById('updatePasswordForm');
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const underwriterId = document.getElementById('underwriterId').value;
            const newPassword = document.getElementById('newPassword').value;

            // Fetch underwriters from local storage
            const underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
            const userIndex = underwriters.findIndex(uw => uw.id === underwriterId);

            if (userIndex !== -1) {
                underwriters[userIndex].password = newPassword;
                localStorage.setItem('underwriters', JSON.stringify(underwriters));
                alert(`Password for Underwriter ID: ${underwriterId} updated successfully.`);
                updatePasswordForm.reset();
            } else {
                alert(`No underwriter found with ID: ${underwriterId}`);
            }
        });
    }

    // Delete Underwriter
    const deleteForm = document.getElementById('deleteForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const underwriterId = document.getElementById('underwriterId').value;

            // Fetch underwriters from local storage
            let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
            const newUnderwriters = underwriters.filter(uw => uw.id !== underwriterId);

            if (newUnderwriters.length < underwriters.length) {
                localStorage.setItem('underwriters', JSON.stringify(newUnderwriters));
                alert(`Underwriter ID: ${underwriterId} deleted successfully.`);
                deleteForm.reset();
            } else {
                alert(`No underwriter found with ID: ${underwriterId}`);
            }
        });
    }

    // View All Underwriters
    const underwritersTable = document.getElementById('underwritersTable').getElementsByTagName('tbody')[0];
    if (underwritersTable) {
        const underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];

        underwriters.forEach(uw => {
            const row = underwritersTable.insertRow();
            row.innerHTML = `<td>${uw.id}</td><td>${uw.name}</td><td>${uw.dob}</td><td>${uw.joiningDate}</td>`;
        });
    }
});
