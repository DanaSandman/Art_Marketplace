import React from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { EmptyState } from '../../../util/EmptyState';

export function DesktopTable({ table, emptyTxt }) {
  return (
    <>
      {table.data.length ? (
        <Table>
          <TableHead>
            <TableRow>
              {table.columns.map((cell, idx) => (
                <TableCell title={cell} key={`h-${idx}`}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.data.map((row, rIdx) => (
              <TableRow key={`r${rIdx}`}>
                {row.details.map((cell, cIdx) => (
                  <TableCell title={cell} key={`${rIdx}-${cIdx}`}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState txt={emptyTxt} />
      )}
    </>
  );
}
