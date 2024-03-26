import React, { useEffect, useState } from 'react';
import { tableHead } from './data';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Tooltip,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import CreateUserModal from './CreateUserModal';
import { Delete, Search } from '@mui/icons-material';
import { getUsers } from '../../services/user-services/service';
import moment from 'moment';
import DeleteUserModal from './DeleteUserModal';
const ITEMS_PER_PAGE = 10; // Change this to your desired items per page

function UserListTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [pagination, setPagination] = useState({});
  const [tableBody, setTableBody] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const { total, currentPage, from, to } = pagination;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  // Filter tableBody based on searchTerm
  const filteredTableBody = tableBody?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  useEffect(() => {
    const fetchTable = async () => {
      setIsTableLoading(true);
      const res = await getUsers(`limit=${ITEMS_PER_PAGE}&page=${page}`);
      setTableBody(res?.data?.Users);
      setPagination(res?.data?.pagination);
      setIsTableLoading(false);
    };
    fetchTable();
  }, [page, shouldFetch]);

  const renderCell = React.useCallback(
    (user, columnKey, index) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case 'sno':
          return `${(currentPage - 1) * ITEMS_PER_PAGE + index + 1}`;
        case 'f_dob':
          return moment(cellValue).format('DD-MMM-YYYY');
        case 'f_doj':
          return moment(cellValue).format('DD-MMM-YYYY');
        case 'action':
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Delete User" size="sm" color="danger">
                <span
                  className={'text-danger cursor-pointer active:opacity-50'}
                  onClick={() => {
                    setUserDetails(user);
                    setShowDeleteUserModal(true);
                    onOpenChange();
                  }}
                >
                  <Delete style={{ fontSize: '0.9rem' }} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [currentPage]
  );

  return (
    <>
      <Table
        aria-label="Leads Table"
        radius="none"
        bottomContentPlacement="outside"
        topContent={
          <div className="flex justify-between items-center text-xs ">
            <Input
              className="w-96"
              placeholder="Search...."
              startContent={<Search />}
              size="sm"
              radius="sm"
              isRequired
              aria-label="table-search"
              variant="bordered"
              classNames={{
                label: 'text-xs',
                input: 'text-xs placeholder:text-xs',
                inputWrapper: 'p-0 pl-1 min-h-unit-8 h-8',
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              autoFocus
            />
            <CreateUserModal setShouldFetch={setShouldFetch} />
          </div>
        }
        bottomContent={
          total > 0 && tableBody.length > 0 ? (
            <div className="flex justify-between mr-2">
              <div className="text-xs">
                Showing <span className="font-bold">{from}</span> to
                <span className="font-bold"> {to} </span>
                of <span className="font-bold">{total}</span> entries
              </div>
              <Pagination
                total={Math.ceil(total / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={(page) => {
                  setPage(page);
                }}
                isCompact
                showControls
                variant="flat"
                size="sm"
                siblings={2}
                loop
                classNames={{
                  cursor: 'bg-foreground text-background',
                }}
              />
            </div>
          ) : (
            false
          )
        }
        classNames={{ wrapper: 'px-2', sortIcon: 'text-black opacity-1' }}
      >
        <TableHeader columns={tableHead}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.uid}
              className={
                column.name === 'Status' || column.name === 'Action'
                  ? 'text-center '
                  : '  '
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isTableLoading}
          loadingContent={
            <Spinner label="Loading..." color="warning" size="lg" />
          }
          emptyContent={isTableLoading ? ' ' : 'No Results Found'}
        >
          {currentPage > 0 && tableBody?.length > 0
            ? filteredTableBody.map((item, index) => (
                <TableRow
                  key={item._id}
                  className={`${'hover:bg-danger-100 hover:cursor-pointer transition-all duration-500 ease-in-out'}`}
                >
                  {(columnKey) => (
                    <TableCell
                      className={
                        columnKey === 'action' ||
                        columnKey === 'f_designation' ||
                        columnKey === 'f_gender' ||
                        columnKey === 'f_course'
                          ? 'text-center text-xs'
                          : 'text-xs'
                      }
                    >
                      {renderCell(item, columnKey, index, currentPage)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>

      {showDeleteUserModal ? (
        <DeleteUserModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          setShowDeleteUserModal={setShowDeleteUserModal}
          setShouldFetch={setShouldFetch}
          userDetails={userDetails}
        />
      ) : null}
    </>
  );
}

export default UserListTable;
