import React from 'react';
import MaterialTable from 'material-table';

const Table = ({ columns, data, handleAddScooter, handleUpdateScooter, handleDeleteScooter }) => (
    <MaterialTable
        columns={columns}
        data={data}
        editable={{
            onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        handleAddScooter(newData);
                    }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                            handleUpdateScooter(newData);
                        }
                    }, 600);
                }),
            onRowDelete: ({ id }: { id: string }) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        handleDeleteScooter(id);
                    }, 600);
                }),
        }}
    />
);

export default Table;
