document.addEventListener('DOMContentLoaded', () => {
    const addSongForm = document.getElementById('songForm');
    const editSongForm = document.getElementById('updateSongForm');

    // Inicializar DataTables
    const table = $('#songsTable').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        language: {
            search: "Buscar:",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            info: "Mostrando _START_ a _END_ de _TOTAL_ entradas"
        }
    });


    function fetchAndLoadSongs() {
        fetch('/canciones')
            .then(response => response.json())
            .then(data => {
                table.clear(); // Limpia la tabla antes de agregar nuevas filas

                data.forEach(song => {
                    table.row.add([
                        song.id,
                        song.titulo,
                        song.artista,
                        song.tono,
                        `<button class="btn btn-warning btn-edit" data-id="${song.id}"> Editar</button>
                         <button class="btn btn-danger btn-delete" data-id="${song.id}">Eliminar</button>`
                    ]).draw(false);
                });
            }).catch(error => console.error('Error:', error));
    }

    // Agregar canción
    addSongForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const songData = {
            titulo: formData.get('cancion'),
            artista: formData.get('artista'),
            tono: formData.get('tono')
        };

        fetch('/cancion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(songData)
        })
            .then(response => response.json())
            .then(() => {
                fetchAndLoadSongs(); // Recargar canciones después de agregar
                addSongForm.reset();
                $('#addModal').modal('hide');
            })
            .catch(error => console.error('Error:', error));
    });

    // Editar canción
    $('#songsTable tbody').on('click', 'button.btn-edit', function () {
        const data = table.row($(this).parents('tr')).data();
        $('#editId').val(data[0]); // Asumiendo que la primera columna es el ID
        $('#editCancion').val(data[1]); // Asumiendo que la segunda columna es el Título de la canción
        $('#editArtista').val(data[2]); // Asumiendo que la tercera columna es el Artista
        $('#editTono').val(data[3]); // Asumiendo que la cuarta columna es el Tono
        $('#editModal').modal('show');
    });

    $('#updateBtn').on('click', function (e) {
        e.preventDefault();

        const songId = $('#editId').val();
        const updatedSongData = {
            titulo: $('#editCancion').val(),
            artista: $('#editArtista').val(),
            tono: $('#editTono').val()
        };

        fetch(`/ cancion / ${songId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSongData)
        })
            .then(response => response.json())
            .then(() => {
                fetchAndLoadSongs(); // Recargar canciones después de actualizar
                $('#editModal').modal('hide');
            })
            .catch(error => console.error('Error:', error));
        console.log("Canción actualizada:", updatedSongData);
    });


    // Mostrar el modal de confirmación de eliminación cuando se hace clic en un botón de eliminar
    $('#songsTable tbody').on('click', 'button.btn-delete', function () {
        currentSongIdToDelete = $(this).data('id'); // Almacenar el ID de la canción a eliminar
        $('#deleteModal').modal('show'); // Mostrar el modal de confirmación de eliminación
    });

    // Manejar la confirmación de eliminación dentro del modal
    $('#deleteModal .btn-primary').on('click', function () {
        if (currentSongIdToDelete !== null) {
            fetch(`/ cancion / ${currentSongIdToDelete}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar la canción');
                    }
                    return response.json(); // Asegúrate de que tu backend devuelva una respuesta JSON adecuada
                })
                .then(() => {
                    $('#deleteModal').modal('hide'); // Ocultar el modal después de la eliminación
                    fetchAndLoadSongs(); // Recargar canciones para reflejar los cambios
                })
                .catch(error => {
                    console.error('Error:', error);
                    $('#deleteModal').modal('hide'); // Asegúrate de ocultar el modal incluso si hay un error
                });
        }
    });
    fetchAndLoadSongs()
});


