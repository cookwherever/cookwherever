import sys
from warcio.archiveiterator import ArchiveIterator


def print_records(archive):
    for record in ArchiveIterator(open(archive, 'rb'), arc2warc=True):
        if record.rec_type == 'response':
            print(record.content_stream().read())


def main():
    archive = sys.argv[1]
    print_records(archive)


if __name__ == "__main__":
    main()